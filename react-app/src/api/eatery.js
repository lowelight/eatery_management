import server from ".";

const getEateries = async () => {
  const res = await server.get("/customers/eateries");
  return res;
};

export const getEateriesLoader = async () => {
  const res = await getEateries();
  if (res.status === 200) {
    return res.data.data;
  } else {
    return res.data.msg;
  }
};


export const fetchInfo = async (...params) => {
  console.log(params)
  
  const res = server.get(`/customers/eateries/vouchers/${params[0]}`);
  console.log(res)
  return res;
};
