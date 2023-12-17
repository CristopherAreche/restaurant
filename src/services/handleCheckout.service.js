export const handleCheckout = async ({ session, totalPrice, products }) => {
  if (!session) {
    router.push("/login");
  } else {
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: totalPrice,
          products,
          status: "Not Paid!",
          userEmail: session.user.email,
        }),
      });
      const data = await res.json();
      router.push(`/pay/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  }
};
