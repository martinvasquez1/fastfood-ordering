export interface AuthResponse {
  accessToken: string;
  userId: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';

const handleResponse = async (response: Response) => {
  const text = await response.text();
  const trimmedText = text.trim();

  if (!response.ok) {
    let errorMessage = response.statusText;

    if (trimmedText) {
      try {
        const payload = JSON.parse(trimmedText);
        if (payload?.message) {
          errorMessage = Array.isArray(payload.message)
            ? payload.message.join(', ')
            : payload.message;
        } else if (payload?.error) {
          errorMessage = payload.error;
        }
      } catch {
        errorMessage = trimmedText;
      }
    }

    throw new Error(errorMessage || `Request failed with status ${response.status}`);
  }

  return trimmedText ? JSON.parse(trimmedText) : {};
};

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
}

export async function signUp(payload: {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
}): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}
