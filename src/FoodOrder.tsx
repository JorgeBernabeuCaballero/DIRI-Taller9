import { MouseEventHandler, useState } from "react";
import { MenuItem } from "./entities/entities";
//import './foodOrder.css';
import { FormattedMessage } from "react-intl";

interface FoodOrderProps {

    food: MenuItem;
    onQuantityUpdated(id: number, quantity: number): void;
    onReturnToMenu: MouseEventHandler<HTMLButtonElement> | undefined;
    onOrderSubmit(id: number, quantity: number): void;

}

function FoodOrder(props: FoodOrderProps) {

    const [quantity, setQuantity] = useState(1);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const handleOrderSubmit = () => {
        props.onOrderSubmit(props.food.id, quantity);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10) || 1; 
        setQuantity(newQuantity);
        props.onQuantityUpdated(props.food.id, newQuantity);
    }
    

    return(
        <div className="FoodOrder p-4 bg-white shadow-md rounded-lg w-full max-w-md mx-auto">
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                <FormattedMessage id="app.label.quantity" />:
                </label>
                <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                max={props.food.quantity}
                className="p-2 border border-gray-300 rounded-md shadow-sm w-full"
                />
            </div>
            
            <button
                onClick={handleOrderSubmit}
                className="w-full px-4 py-2 mb-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
            >
                <FormattedMessage id="app.label.makeOrder" />
            </button>
            
            <button
                onClick={props.onReturnToMenu}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 transition duration-200"
            >
                <FormattedMessage id="app.label.return" />
            </button>
    </div>

);
};

export default FoodOrder