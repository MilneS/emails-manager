export const getUser = async (email: string) => {
  const fetchedUser = await fetch("http://localhost:3000/api/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: email,
    },
  });
  return fetchedUser.json();
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  isAdmin: boolean
) => {
  const userData = {
    name,
    email,
    password,
    isAdmin,
  };
  const fetchedUser = await fetch("http://localhost:3000/api/user/", {
    method: "POST",
    body: JSON.stringify(userData),
  });
  return fetchedUser.json();
};
