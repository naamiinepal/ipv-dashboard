import os.path
from functools import lru_cache

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.routing import APIRoute
from fastapi.staticfiles import StaticFiles
from pydantic import ValidationError

# Mount routers before database to read their database models
from .auth import router as auth_router
from .pseudo_tweets import router as pseudo_router
from .tweets import router as tweets_router
from .tweets_common import router as tweets_common_router

from .database import create_tables  # isort: skip


def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}" if route.tags else route.name


app = FastAPI(generate_unique_id_function=custom_generate_unique_id)


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    # Capture the Validation errror from pydantic and return it as a JSON response
    return JSONResponse({"detail": exc.errors()}, status_code=422)


app.mount("/assets", StaticFiles(directory="assets"), name="assets")


@app.on_event("startup")
def on_startup():
    create_tables()


# Register API Routers here
app.include_router(auth_router)
app.include_router(pseudo_router)
app.include_router(tweets_router)
app.include_router(tweets_common_router)


# Cache the output for maximum 10 items
@lru_cache(maxsize=10)
def get_actual_path(filename: str):
    return os.path.join("templates", filename)


@app.get("/{file_path:path}", response_class=FileResponse)
async def index(file_path: str):
    """
    Fallback route to get the document needed for client side routing.
    Fallback is kept since the server doesn't know all the routes
        needed in the client side.
    **Please use the file server from the nginx instead of calling
        this function for each static file.**

    Args:
        file_path (str): The path to the file inside the templates directory

    Returns:
        File: The file request if found, else falls back to index.html
    """
    actual_path = get_actual_path(file_path)
    if os.path.isfile(actual_path):
        return actual_path
    return get_actual_path("index.html")
