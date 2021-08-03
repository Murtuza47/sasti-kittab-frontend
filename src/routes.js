import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router";
import { Loader } from "./Components/Loader/Loader";
import { BasePage } from "./Pages/BasePage";
import { PageContainer } from "./Pages/PageContainer";
import {
  ROOT,
  PRODUCT_PAGE,
  CART_PAGE,
  lOGIN,
  REGISTER_PAGE,
  PROFILE_PAGE,
  SHIPPING_PAGE,
  PAYMENT_PAGE,
  PLACE_ORDER_PAGE,
  GET_ORDER_PAGE,
} from "./routesMap";

const productComponent = lazy(() => import("./Pages/ProductPage"));
const cartComponent = lazy(() => import("./Pages/CartComponent"));
const loginComponent = lazy(() => import("./Pages/LoginPage"));
const resgisterComponent = lazy(() => import("./Pages/RegisterPage"));
const profileComponent = lazy(() => import("./Pages/ProfilePage"));
const shippingComponent = lazy(() => import("./Pages/ShippingPage"));
const paymentComponent = lazy(() => import("./Pages/PaymentPage"));
const placeOrderComponent = lazy(() => import("./Pages/PlaceOrder"));
const getOrderComponent = lazy(() => import("./Pages/OrderPage"));

export const Routes = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      }
    >
      <PageContainer>
        <Switch>
          <Route exact path={ROOT} component={BasePage} />
          <Route path={lOGIN} component={loginComponent} />
          <Route path={PRODUCT_PAGE} component={productComponent} />
          <Route path={CART_PAGE} component={cartComponent} />
          <Route path={REGISTER_PAGE} component={resgisterComponent} />
          <Route path={PROFILE_PAGE} component={profileComponent} />
          <Route path={SHIPPING_PAGE} component={shippingComponent} />
          <Route path={PAYMENT_PAGE} component={paymentComponent} />
          <Route path={PLACE_ORDER_PAGE} component={placeOrderComponent} />
          <Route path={GET_ORDER_PAGE} component={getOrderComponent} />
        </Switch>
      </PageContainer>
    </Suspense>
  );
};
