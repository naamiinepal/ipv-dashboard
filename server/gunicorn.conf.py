wsgi_app = "app:app"
workers = 4
worker_class = "uvicorn.workers.UvicornWorker"
bind = "unix:gunicorn.sock"
accesslog = "access.log"
errorlog = "error.log"
loglevel = "info"
daemon = False
