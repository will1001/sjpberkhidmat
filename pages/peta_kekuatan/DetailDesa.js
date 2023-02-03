import { withRouter } from "next/router";
import React from "react";

const DetailDesa = ({ router }) => {
  console.log(router?.query);
  return <div>{router?.query?.desa}</div>;
};

export default withRouter(DetailDesa);
