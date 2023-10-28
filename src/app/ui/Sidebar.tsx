import { Link, useLocation } from 'react-router-dom'
import logo from '/logo.png';

const classNames = (...cls: string[]) => cls.filter(Boolean).join(' ');

const navigation = [
  { name: 'Дашборд', href: '/' },
  { name: 'Мои заявки', href: '/requests' },
  { name: 'Новая заявка', href: '/new-request' },
  { name: 'Согласованные заявки', href: '#' },
  { name: 'Отклоненные заявки', href: '#' },
]

const Sidebar: React.FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white pb-4 rounded-tr-3xl rounded-br-3xl">
      <div className="flex h-20 shrink-0 items-center px-6">
        <img
          className="h-11 w-auto"
          src={logo}
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={closeMenu}
                    className={classNames(
                      item.href === pathname
                        ? 'bg-my-blue text-white'
                        : 'text-gray-900 hover:text-gray-500',
                      'group flex gap-x-3 py-4 px-7 text-sm leading-6 font-semibold rounded-r-2xl'
                    )}
                  >
                    {/* <item.icon
                      className={classNames(
                        item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    /> */}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar