export const Helper = (id, basket, setBasket, item, addAmount) => {
    const existingItem = basket.find(item => item.id === id);

    if (existingItem) {
        const changedBasket = basket.map(obj => {return obj.id === existingItem.id ? { ...obj, amount: +obj.amount + addAmount} : obj});
        setBasket(changedBasket)
        return;
    }

    setBasket([...basket, {...item, amount: addAmount}]);
    return; 

}