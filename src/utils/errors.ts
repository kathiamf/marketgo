export function friendlyError(error: unknown): string {
  const message =
    typeof error === 'object' && error !== null && 'message' in error
      ? String(error.message)
      : String(error);

  if (message.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
  if (message.includes('User already registered'))
    return 'Este e-mail já está cadastrado.';
  if (message.includes('Email not confirmed'))
    return 'Confirme seu e-mail antes de entrar.';
  if (/network request failed|failed to fetch/i.test(message)) {
    return 'Sem conexão com a internet.';
  }
  if (/rate limit/i.test(message))
    return 'Muitas tentativas. Aguarde um instante e tente de novo.';
  return message;
}
