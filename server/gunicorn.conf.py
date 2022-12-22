wsgi_app = "app:app"
workers = 4
worker_class = "uvicorn.workers.UvicornWorker"
bind = "0.0.0.0:23456"
accesslog = "access.log"
errorlog = "error.log"
loglevel = "info"
daemon = False
