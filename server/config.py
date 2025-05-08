def get_config():
    """Return the configuration as a dictionary."""
    return {
        "SECRET_KEY": "dx3e73exneree3xe32c3egvxydg3evxye22s",
        "MONGO_URI": "mongodb://localhost:27017/production-project",

        # Email configurations
        "MAIL_SERVER": 'smtp.gmail.com',
        "MAIL_PORT": 465,
        "MAIL_USERNAME": 'aidiseasepredictor@gmail.com',
        "MAIL_PASSWORD": 'hnnb kunw gopb yznx',
        "MAIL_USE_TLS": False,
        "MAIL_USE_SSL": True
    }
