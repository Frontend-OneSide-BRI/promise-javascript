const user = [
    { id: 1, username: "lala", address: "Jakarta" },
    { id: 2, username: "lili", address: "Surabaya" },
  ];
  
  const transaction = [
    {
      user_id: 1,
      transaction: [
        { id: 1, status: "Selesai" },
        { id: 1, status: "Sedang dikirim" },
      ],
    },
    {
      user_id: 2,
      transaction: [
        { id: 2, status: "Selesai" },
        { id: 2, status: "Dibatalkan" },
      ],
    },
  ];
  
  const detailTransaction = [
    { id: 1, productName: "Kopi Hitam", qty: 3, totalAmount: 3000 },
    { id: 2, productName: "Kopi Susu", qty: 1, totalAmount: 3500 },
  ];
  
  function uname(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(user.filter((item) => item.username === username));
      }, 1000);
    });
  }
  
  function trans(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(transaction.filter((item) => item.user_id === id));
      }, 1500);
    });
  }
  
  function detail(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(detailTransaction.filter((item) => item.id === id));
      }, 2000);
    });
  }
  
  uname("lala")
    .then((users) => {
      const user = users[0];
      return trans(user.id);
    })
    .then((transactions) => {
      const detailPromises = transactions.map((transaction) => {
        return Promise.all(
          transaction.transaction.map((item) => detail(item.id))
        );
      });
      return Promise.all(detailPromises);
    })
    .then((detailResults) => {
      const details = detailResults.flat();
      console.log(details);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  