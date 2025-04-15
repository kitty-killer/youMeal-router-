export const adjustItemQuantity = (id, delta, basket, setBasket) => {
    const currentItem = basket.find((item) => item.id === id);
    if (currentItem?.amount <= 1 && delta === -1) {
        setBasket(basket.filter((item) => item.id !== id));
        return;
    }

    const updatedBasket = basket.map((item) =>
        item.id === id
            ? { ...item, amount: Number(item.amount) + delta }
            : item
    );

    setBasket(updatedBasket);
};
