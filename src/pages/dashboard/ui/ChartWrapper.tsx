import { ChevronDown } from '@/shared/icons'

interface ChartWrapperProps {
  title: string;
  option: string;
  children: React.ReactNode
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, option, children }) => (
  <section className='flex flex-col gap-8'>
    <header className="flex items-center justify-between">
      <h1 className="font-medium text-my-black">{title}</h1>
      <div className='flex items-center gap-2 text-sm font-normal cursor-pointer'>
        {option}
        <ChevronDown />
      </div>
    </header>

    <div>
      {children}
    </div>

  </section>
)

export default ChartWrapper