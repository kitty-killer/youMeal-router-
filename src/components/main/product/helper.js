export const handleAddToBasket = (props, basket, setBasket) => {
    const product = {
        id: props.id,
        name: props.name,
        img: props.img,
        weight: props.weight,
        price: props.price,
        description: props.description,
        compos: props.compos,
        calories: props.calories,
    };

    const existingItem = basket.find((item) => item.id === product.id);
    if (existingItem) {
        setBasket(
            basket.map((item) =>
                item.id === product.id
                    ? { ...item, amount: item.amount + 1 }
                    : item
            )
        );
    } else {
        setBasket([...basket, { ...product, amount: 1 }]);
    }
};

export const handleImageClick = (props, setIsOpen, setCategoryId, setItem) => {
    setIsOpen(true);
    setCategoryId("addToBasket");
    setItem({
        id: props.id,
        name: props.name,
        img: props.img,
        weight: props.weight,
        price: props.price,
        description: props.description,
        compos: props.compos,
        calories: props.calories,
    });
};
