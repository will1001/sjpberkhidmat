import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./TextEditor"), {
  ssr: false,
});

export default () => <DynamicComponentWithNoSSR />;
