import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const services = [
    {
      title: 'Диагностика',
      description: 'Выявление неисправностей и оценка стоимости ремонта',
      price: 'от 500 ₽',
      icon: 'Search'
    },
    {
      title: 'Мелкий ремонт',
      description: 'Замена иглы, лапки, регулировка натяжения нити',
      price: 'от 800 ₽',
      icon: 'Wrench'
    },
    {
      title: 'Средний ремонт',
      description: 'Замена ремней, чистка челнока, настройка механизмов',
      price: 'от 1500 ₽',
      icon: 'Settings'
    },
    {
      title: 'Капитальный ремонт',
      description: 'Полная разборка, замена узлов, смазка механизмов',
      price: 'от 3000 ₽',
      icon: 'Cog'
    },
    {
      title: 'Техническое обслуживание',
      description: 'Профилактическая чистка и смазка швейной машины',
      price: 'от 1200 ₽',
      icon: 'ClipboardCheck'
    },
    {
      title: 'Срочный ремонт',
      description: 'Ремонт в течение 1-2 дней с доплатой',
      price: '+50% к стоимости',
      icon: 'Zap'
    }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleBooking = () => {
    if (selectedService && selectedDate && selectedTime && name && phone) {
      alert(`Спасибо, ${name}! Ваша запись на ${selectedService} подтверждена на ${selectedDate.toLocaleDateString('ru-RU')} в ${selectedTime}`);
      setBookingOpen(false);
      setSelectedService('');
      setSelectedDate(undefined);
      setSelectedTime('');
      setName('');
      setPhone('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Scissors" className="text-primary" size={28} />
            <h1 className="text-2xl font-heading font-bold text-foreground">МастерШвей</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Услуги</a>
            <a href="#prices" className="text-muted-foreground hover:text-primary transition-colors">Прайс</a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">О нас</a>
            <a href="#contacts" className="text-muted-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="gap-2" onClick={() => setBookingOpen(true)}>
            <Icon name="Calendar" size={18} />
            Записаться
          </Button>
        </div>
      </header>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-heading">Онлайн-запись на ремонт</DialogTitle>
                <DialogDescription>
                  Заполните форму для записи на удобное время
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Выберите услугу</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип ремонта" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.title} value={service.title}>
                          {service.title} — {service.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Выберите дату</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Выберите время</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="w-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBooking}
                  disabled={!selectedService || !selectedDate || !selectedTime || !name || !phone}
                >
                  Подтвердить запись
                </Button>
              </div>
        </DialogContent>
      </Dialog>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/908b242e-f9e2-4885-802a-b7cd9ff0d858/files/6f932b05-685d-48ec-8cbb-2e0b6a240f1e.jpg"
            alt="Швейная мастерская"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-white animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Профессиональный ремонт<br />швейных машин
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Более 15 лет опыта. Качественный ремонт любой сложности.<br />Гарантия на все виды работ.
          </p>
          <Button size="lg" className="gap-2 text-lg px-8 animate-scale-in" onClick={() => setBookingOpen(true)}>
            <Icon name="Phone" size={20} />
            Записаться на ремонт
          </Button>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Выполняем ремонт швейных машин всех марок и моделей
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={24} />
                  </div>
                  <CardTitle className="font-heading">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-primary">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Прайс-лист</h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    { name: 'Диагностика неисправностей', price: '500 ₽' },
                    { name: 'Замена иглы или лапки', price: '800 ₽' },
                    { name: 'Регулировка натяжения нити', price: '900 ₽' },
                    { name: 'Чистка и смазка механизмов', price: '1200 ₽' },
                    { name: 'Замена ремня', price: '1500 ₽' },
                    { name: 'Настройка челночного механизма', price: '1800 ₽' },
                    { name: 'Капитальный ремонт', price: 'от 3000 ₽' },
                    { name: 'Срочный ремонт (1-2 дня)', price: '+50% к стоимости' }
                  ].map((item, index) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center py-3 border-b last:border-0 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <span className="text-foreground">{item.name}</span>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <p className="text-center text-muted-foreground mt-6">
              * Окончательная стоимость определяется после диагностики
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center mb-12">О нас</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: 'Award', title: '15+ лет', description: 'опыта работы' },
                { icon: 'Users', title: '2000+', description: 'довольных клиентов' },
                { icon: 'CheckCircle2', title: '100%', description: 'гарантия качества' }
              ].map((stat, index) => (
                <div 
                  key={stat.title} 
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={stat.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-2">{stat.title}</h3>
                  <p className="text-muted-foreground">{stat.description}</p>
                </div>
              ))}
            </div>
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Мы занимаемся профессиональным ремонтом швейных машин с 2008 года. Наши мастера 
                  имеют высшее техническое образование и регулярно проходят обучение по работе с 
                  новыми моделями швейного оборудования. Мы работаем со всеми типами машин: бытовыми, 
                  промышленными, оверлоками и распошивальными машинами. Гарантируем качество выполненных 
                  работ и используем только оригинальные запчасти.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-heading">Свяжитесь с нами</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="text-primary mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Адрес</p>
                    <p className="text-muted-foreground">г. Москва, ул. Мастеровая, д. 15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" className="text-primary mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" className="text-primary mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@mastershvey.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" className="text-primary mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Режим работы</p>
                    <p className="text-muted-foreground">Пн-Сб: 9:00 - 19:00</p>
                    <p className="text-muted-foreground">Вс: выходной</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="font-heading">Запишитесь онлайн</CardTitle>
                <CardDescription>
                  Выберите удобное время для визита
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg" onClick={() => setBookingOpen(true)}>
                  <Icon name="Calendar" className="mr-2" size={20} />
                  Записаться на ремонт
                </Button>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    Бесплатная диагностика при записи через сайт
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Scissors" size={24} />
            <span className="text-xl font-heading font-bold">МастерШвей</span>
          </div>
          <p className="text-white/70">© 2024 МастерШвей. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;