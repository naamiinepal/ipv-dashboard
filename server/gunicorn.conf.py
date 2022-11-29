wsgi_app = "app:app"
workers = 4
worker_class = "uvicorn.workers.UvicornWorker"
bind = "0.0.0.0:23456"
accesslog = "app.log"
loglevel = "info"
daemon = False
