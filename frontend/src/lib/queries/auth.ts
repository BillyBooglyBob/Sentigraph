import { handleLoginAddCookies, handleLogOutClearCookies } from "../action";

/* 
Only use (credentials: "include") if you need to send cookies with the request.
*/

export async function registerUser(data: {
  email: string;
  password1: string;
  password2: string;
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/register/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Registration failed:", errorData);
      throw new Error(
        errorData?.non_field_errors?.[0] || "Registration failed"
      );
    }

    const resData = await res.json();
    handleLoginAddCookies(resData.user.pk, resData.access, resData.refresh);
    return resData;
  } catch (err) {
    console.error("Error during registration:", err);
    return null;
  }
}

export async function loginUser(data: { email: string; password: string }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Login failed:", errorData);
      throw new Error(errorData?.non_field_errors?.[0] || "Login failed");
    }

    const resData = await res.json();
    handleLoginAddCookies(resData.user.pk, resData.access, resData.refresh);
    return resData;
  } catch (err) {
    console.error("Error during login:", err);
    return null;
  }
}

export async function logoutUser() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/logout/`,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Logout failed:", errorData);
      throw new Error("Logout failed");
    }

    const resData = await res.json();
    handleLogOutClearCookies();
    console.log("Logout successful:", resData);
    return resData;
  } catch (err) {
    console.error("Error during logout:", err);
    return null;
  }
}

export async function getUserInformation(data: { email: string }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/user/${data.email}/`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Only use if you need to send cookies
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.error("Server error:", error);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Network or parsing error:", err);
    return null;
  }
}
