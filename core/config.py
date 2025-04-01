from pathlib import Path
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).parent.parent


class AccessToken(BaseModel):
    lifetime_seconds: int = 3600
    reset_password_token_secret: str
    verification_token_secret: str


class DatabaseSettings(BaseModel):
    url: str = f"sqlite+aiosqlite:///{BASE_DIR}/db.sqlite3"
    echo: bool = True
    echo_pool: bool = False
    pool_size: int = 5
    max_overflow: int = 10


class Settings(BaseSettings):
    api_v1_prefix: str = "/api/v1"
    auth: str = "/auth"
    users: str = "/users"
    db: DatabaseSettings = DatabaseSettings()
    access_token: AccessToken

    default_email: str
    default_password: str
    default_is_active: bool = True
    default_is_superuser: bool = True
    default_is_verified: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__"
    )

    @property
    def bearer_token_url(self) -> str:
        parts = (self.api_v1_prefix, self.auth, "/login")
        path = "".join(parts)
        return path.removeprefix("/")


settings = Settings()
