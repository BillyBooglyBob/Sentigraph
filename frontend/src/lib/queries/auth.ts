import { handleLoginAddCookies, handleLogOutClearCookies } from "../action";

export async function registerUser(data: {
  email: string;
  password1: string;
  password2: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/register/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // credentials: "include", // Uncomment if needed for your server config
    }
  );

  // Check if the response is not OK
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Registration failed:", errorData);
    throw new Error(errorData?.non_field_errors?.[0] || "Registration failed");
  }

  // Now, handle the successful response and extract the data
  try {
    const contentType = res.headers.get("content-type");

    // Check if the content type is JSON before parsing
    if (contentType && contentType.includes("application/json")) {
      const resData = await res.json();
      // console.log("Response Data:", resData); // Log the successful response

      // Save the userId and tokens in cookies
      handleLoginAddCookies(resData.user.pk, resData.access, resData.refresh);

      return resData; // Return the response data, e.g., { access, refresh, user }
    }

    // In case the response isn't JSON, return null or some other fallback
    console.warn("Response isn't JSON:", contentType);
    return null;
  } catch (err) {
    console.error("Error parsing response:", err);
    return null; // Return null in case of any errors
  }
}

export async function loginUser(data: { email: string; password: string }) {
  /* Login */
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      // credentials: "include",
    }
  );
  // Check if the response is not OK
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Login failed:", errorData);
    throw new Error(errorData?.non_field_errors?.[0] || "Login failed");
  }

  // Now, handle the successful response and extract the data
  try {
    const contentType = res.headers.get("content-type");

    // Check if the content type is JSON before parsing
    if (contentType && contentType.includes("application/json")) {
      const resData = await res.json();
      // console.log("Response Data:", resData); // Log the successful response

      // Save the userId and tokens in cookies
      handleLoginAddCookies(resData.user.pk, resData.access, resData.refresh);

      return resData; // Return the response data, e.g., { access, refresh, user }
    }

    // In case the response isn't JSON, return null or some other fallback
    console.warn("Response isn't JSON:", contentType);
    return null;
  } catch (err) {
    console.error("Error parsing response:", err);
    return null; // Return null in case of any errors
  }
}

export async function logoutUser() {
  /* Logout */
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/logout/`,
    {
      method: "POST",
      // credentials: "include",
    }
  );
  if (!res.ok) throw new Error("Logout failed");
  const resData = await res.json();
  handleLogOutClearCookies(); // Clear the cookies on logout
  console.log("Logout Response Data:", resData); // Log the successful response
  return resData;
}
