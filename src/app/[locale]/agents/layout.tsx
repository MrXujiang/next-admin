import { NextIntlClientProvider, useMessages } from 'next-intl';

type Props = {
    children: React.ReactNode;
    params: {locale: string};
};

export default function LocaleLayout({children, params: { locale }}: Props) {
    // Receive messages provided in `i18n.ts`
    const messages = useMessages();
   
    return <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
  }