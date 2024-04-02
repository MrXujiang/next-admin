import {
    createLocalizedPathnamesNavigation,
    Pathnames
  } from 'next-intl/navigation';
  
  export const defaultLocale = 'zh';
  
  export const locales = ['en', 'zh'] as const;
  
  export const localePrefix =
    process.env.NEXT_PUBLIC_LOCALE_PREFIX === 'never' ? 'never' : 'as-needed';
  
  export const pathnames = {
    '/': '/',
    '/user': '/user',
    '/dashboard': '/dashboard',
    // '/client': '/client',
    // '/client/redirect': '/client/redirect',
    // '/nested': {
    //   en: '/nested',
    //   zh: '/verschachtelt'
    // },
    // '/news/[articleId]': {
    //   en: '/news/[articleId]',
    //   zh: '/neuigkeiten/[articleId]'
    // }
  } satisfies Pathnames<typeof locales>;
  
  export const {Link, redirect, usePathname, useRouter} =
    createLocalizedPathnamesNavigation({
      locales,
      localePrefix,
      pathnames
    });