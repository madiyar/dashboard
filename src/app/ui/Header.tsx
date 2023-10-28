import React from 'react'
import { useLocation } from 'react-router-dom'
import { BellIcon, MenuIcon } from '@/shared/icons'

const avatarMock = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

const titles: Record<string, string> = {
  '/': 'Дашборд: Анализ заявок компании',
  '/requests': 'Мои завяки',
  '/new-request': 'Новая заявка'
}

const Header: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { pathname } = useLocation();

  const title = titles[`${pathname}`] || 'Dashboard';

  window.document.title = title;

  return (
    <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8 backdrop-blur-lg bg-my-body/20">
      <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-0">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-my-blue lg:hidden"
          onClick={onClick}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon />
        </button>

        <div className="flex flex-1 gap-x-4 items-center lg:gap-x-6">
          <div className="relative flex flex-1 text-my-blue text-xl font-semibold line-clamp-1">
            {title}
          </div>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-my-blue">
              <span className="sr-only">View notifications</span>
              <BellIcon />
            </button>

            <button className="flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50 border border-my-blue"
                src={avatarMock}
                alt=""
              />
              <span className="hidden lg:flex lg:items-center">
                <span className="mx-4 text-base font-normal leading-6 text-my-blue" aria-hidden="true">
                  Иванов И.И.
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
