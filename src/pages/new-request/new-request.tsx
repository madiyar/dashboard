import { useRef, useState } from 'react'
import Input, { RadioGroup, Select } from './ui/Input'
import { IRequest } from '@/shared/store/types';
import dayjs from 'dayjs';
import { useGetCitiesQuery } from '@/shared/store/requests';

const NewRequest = () => {
  const { data: cities } = useGetCitiesQuery();
  const [isEnableReset, setEnableReset] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    setEnableReset(false);
    ref.current?.reset();
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData: Omit<IRequest, 'id'> = {
      createdAt: (e.currentTarget.elements?.namedItem('createdAt') as HTMLInputElement)?.value || dayjs().format('YYYY-MM-DD'),
      fullName: (e.currentTarget.elements?.namedItem('requestName') as HTMLInputElement)?.value || '',
      phone: (e.currentTarget.elements?.namedItem('phone') as HTMLInputElement)?.value || '',
      type: 'Классический',
      quantity: Number((e.currentTarget.elements?.namedItem('quantity') as HTMLInputElement)?.value || 1),
      cityId: Number((e.currentTarget.elements?.namedItem('cityId') as HTMLInputElement)?.value || 1),
      call: Boolean((e.currentTarget.elements?.namedItem('call') as HTMLInputElement)?.value || false),
    }
    alert('Отправлено')
    console.log(formData);
  }

  return (
    <form onChange={() => setEnableReset(true)} ref={ref} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16">
        <div className="flex flex-col gap-8">
          <Input label="Название заявки*" name="requestName" placeholder="Напишите название заявки" required />
          <div className="flex flex-col md:flex-row gap-8">
            <Input label="Сумма завяки" name="requestPrice" placeholder="Сумма" />
            <Input label="Тип заявки*" name="requestType" placeholder="Классический" value="Классический" disabled className="opacity-80 bg-white cursor-not-allowed" />
          </div>
          <RadioGroup label="Позвонить для подтверждения" name="call" items={[{ value: "true", label: "Да", checked: true }, { value: "false", label: "Нет" }]} />
          <p className="text-xs text-my-black">
            * - обязательные поля
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <Input label="Количество заявителей" name="quantity" placeholder="1" defaultValue={1} type="number" min={1} />
          <Select label="Город" options={(cities ?? []).map(city => ({ value: city.id, children: city.cityName }))} placeholder="Выберите ваш город" defaultValue="1" />
        </div>
        <div className="flex flex-col gap-8">
          <Input label="Номер телефона*" required name="phone" placeholder="+7 (___)  ___ - __ - __" type="tel" />
          <Input label="Дата заявки" name="createdAt" type="date" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 mt-5 md:mt-10">
        <footer className="flex items-center justify-between">
          <button type="submit" className="py-3 px-8 rounded-lg border-2 bg-my-blue text-white border-my-blue">
            Отправить
          </button>
          <button type="reset" onClick={resetForm} disabled={!isEnableReset} className={`${isEnableReset ? 'cursor-pointer' : 'cursor-not-allowed'} py-3 px-8 rounded-lg border-2 text-[#969696] border-[#969696]`}>
            Очистить
          </button>
        </footer>
      </div>
    </form>
  )
}

export default NewRequest