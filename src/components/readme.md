try {
      const response = await fetch(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employees`
      );

      if (!response.ok) {
        throw new Error("Error occur during fetching record");
      }
      const res = await fetch(
        "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee"
      );
      const data = await res.json();
      setEmployee(data);

      console.log("fetch data Successfully.");
    } catch (error) {
      console.error("Error:", error);
}