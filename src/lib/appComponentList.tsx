import { default as App1 } from "@/components/application/app1/App";
import { default as App2 } from "@/components/application/app2/App";
import { default as App3 } from "@/components/application/app3/App";

export const appComponentList = [
  {
    id: "app1",
    component: <App1 Id="app1" />,
  },
  {
    id: "app2",
    component: <App2 Id="app2" />,
  },
  {
    id: "app3",
    component: <App3 Id="app3" />,
  },
];
