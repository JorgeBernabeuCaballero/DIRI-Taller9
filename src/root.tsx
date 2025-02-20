import { IntlProvider } from "react-intl";
import App from "./App";
import { LanguageContext } from "./Inter/Provider";
import React from "react";

const Root = () => {
    const { locale, messages } = React.useContext(LanguageContext);
    return (
        <IntlProvider locale={locale} messages={messages}>
            <App />
        </IntlProvider>
    );
};

export default Root;