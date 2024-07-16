export function parseRestaurantData(data) {
    return data?.map((val) => {
        return {

            cuisine: val?.cuisine,
            description: val?.description,
            image: val?.image,
            location: val?.location,
            menu: val?.menu,
            name: val?.name,
            services: val?.services,
            stars: val?.stars,
            id: val?._id
        }
    })
}


export function parseSaveRestaurant(val) {

    const tempArr = []
    val?.services?.map((val) => {
        tempArr.push(val?.value)
    })

    return {

        cuisine: val?.cuisine,
        description: val?.description,
        image: val?.image,
        location: val?.location,
        menu: val?.menu,
        name: val?.name,
        services: tempArr?.length > 0 ? tempArr?.toString() : "",
        stars: val?.stars,
    }

}

export function parseUpdateRestaurant(val) {
    const tempArr = []
    val?.services?.map((val) => {
        tempArr.push(val?.value)
    })
    return {

        cuisine: val?.cuisine,
        description: val?.description,
        image: val?.image,
        location: val?.location,
        menu: val?.menu,
        name: val?.name,
        services: tempArr?.length > 0 ? tempArr?.toString() : "",
        stars: val?.stars,
        id: val?.id
    }

}



export function parseSaveMenu(val, id) {

    return {
        price: val?.price,
        description: val?.description,
        image: val?.image,
        name: val?.name,
        restaurantId : id

    }

}

export function parseUpdateMenu(val, id) {
    console.log("UPDATE VAL", val)
    return {
        price: val?.price,
        description: val?.description,
        image: val?.image,
        name: val?.name,
        id: val?._id,
        restaurantId : id
    }

}