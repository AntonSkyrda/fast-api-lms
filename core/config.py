from pathlib import Path
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).parent.parent


class AccessToken(BaseModel):
    lifetime_seconds: int = 3600
    reset_password_token_secret: str
    verification_token_secret: str


class Settings(BaseSettings):
    api_v1_prefix: str = "/api/v1"
    auth: str = "/auth"
    db_url: str = f"sqlite+aiosqlite:///{BASE_DIR}/db.sqlite3"
    db_echo: bool = True
    access_token: AccessToken

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__"
    )

    @property
    def bearer_token_url(self) -> str:
        parts = (self.api_v1_prefix, self.auth)
        path = "".join(parts)
        return path.removeprefix("/")


settings = Settings()
