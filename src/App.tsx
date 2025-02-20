import { useContext, useState } from 'react'
//import './App.css'
import { MenuItem } from './entities/entities';
import Foods from './Foods';
import { FormattedMessage } from 'react-intl';
import { LanguageContext } from './Inter/Provider';

function App() {

  const { changeLanguage, locale } = useContext(LanguageContext);
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
    "id": 1,
    "name": "Hamburguesa de Pollo",
    "quantity": 40,
    "desc": "Hamburguesa de pollo frito - … y mayonesa",
    "price": 24,
    "image": "comida.jpg"
    },
    {
      "id": 2,
      "name": "Hamburguesa normal",
      "quantity": 20,
      "desc": "Hamburguesa normal",
      "price": 5,
      "image": "comida.jpg"
    },
    {
        "id": 3,
        "name": "Pizza de peperoni",
        "quantity": 70,
        "desc": "Pizza de peperoni",
        "price": 10,
        "image": "comida.jpg"
      },
  ] 
  );

  const updateFoodQuantity = (id: number, orderedQuantity: number) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - orderedQuantity } : item
      )
    );
  };
   
  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="mb-4">
        <label htmlFor="language-select" className="block text-lg font-medium text-gray-700 mb-2">
          <FormattedMessage id="app.languageSelector" defaultMessage="Select language:" />
        </label>
        <select
          id="language-select"
          onChange={(e) => changeLanguage(e.target.value)}
          value={locale}
          className="p-2 border border-gray-300 rounded-md shadow-sm bg-white">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
        onClick={() => setIsChooseFoodPage(!isChooseFoodPage)}>
        {isChooseFoodPage ? "Disponibilidad" : "Pedir Comida"}
      </button>
      <h3 className="mt-4 text-2xl font-semibold text-gray-800 text-center">
        <FormattedMessage id="app.label.title" />
      </h3>
      {!isChooseFoodPage && (
        <>
          <h4 className="mt-2 text-xl font-medium text-gray-700 text-center">
            <FormattedMessage id="app.label.menu" />
          </h4>
          <ul className="mt-2 space-y-2">
            {menuItems.map((item) => (
              <li key={item.id} className="p-2 border border-gray-200 rounded-md bg-blue-100">
                <p className="text-gray-800">{item.name}</p>
                <p className="text-gray-600">#{item.quantity}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      {isChooseFoodPage && (
        <Foods foodItems={menuItems} onOrderConfirmed={updateFoodQuantity} />
      )}
</div>
);
};

export default App
