import { MenuItem } from "./entities/entities";
import FoodOrder from "./FoodOrder";
//import './food.css';
import { useState } from "react";
import { FormattedMessage } from "react-intl";

interface FoodsProps {

    foodItems: MenuItem[];
    onOrderConfirmed: (id: number, quantity: number) => void;
    //language: string;

}

function Foods(props: FoodsProps) {

    
    const [quantities, setQuantities] = useState<{ [id: number]: number }>(
        props.foodItems.reduce((acc, item) => {
          acc[item.id] = 1;
          return acc;
        }, {} as { [id: number]: number })
    );

    const handleQuantityUpdate = (id: number, quantity: number) => {
        setQuantities((prev) => ({ ...prev, [id]: quantity }));
    };

    const handleOrder = (id: number, quantity: number) => {
        props.onOrderConfirmed(id, quantity);
    };

    const handleReturnToMenu = () => {
        
    };

    return (
        <>
        <h4 className="foodTitle text-2xl font-medium text-gray-800 text-center mt-4">
          <FormattedMessage id="app.label.choose" />
        </h4>
        <ul className="ulFoods mt-6 space-y-4">
          {props.foodItems.map((item) => {
            const totalPrice = item.price * quantities[item.id];
      
            return (
              <li key={item.id} className="liFoods p-4 border border-gray-300 rounded-lg bg-blue-100 flex flex-col items-center">
                <img
                  className="foodImg w-32 h-32 rounded-full mb-4"
                  src={`./images/${item.image}`}
                  alt={item.name}
                />
                <div className="foodItem text-center">
                  <p className="foodDesc text-gray-700">{item.desc}</p>
                  <p className="foodPrice text-gray-900 font-semibold">{totalPrice}$</p>
                </div>
                <FoodOrder
                  food={item}
                  onQuantityUpdated={handleQuantityUpdate}
                  onOrderSubmit={handleOrder}
                  onReturnToMenu={handleReturnToMenu}
                  
                ></FoodOrder>
              </li>
            );
          })}
        </ul>
      </>
      
    );
   };
   export default Foods;