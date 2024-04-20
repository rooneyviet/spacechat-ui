class Constants {
  static readonly OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  static readonly OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL;
  static readonly ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  static readonly OPENAI_MODELS = [
    "gpt-3.5-turbo",
    "gpt-4-turbo",
    "gpt-4-turbo-2024-04-09",
  ];
  static readonly ANTHROPIC_MODELS = [
    "claude-3-opus-20240229",
    "claude-3-sonnet-20240229",
    "claude-3-haiku-20240307",
  ];
}
