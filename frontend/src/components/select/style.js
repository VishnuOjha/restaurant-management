

export const SelectBoxStyle = {
    container: (base, state) => ({
        ...base,
        flex: 1,
        border: `1px solid #CED2D9`,
        borderRadius: 5,
        minHeight: state.selectProps.minHeight ? state.selectProps.minHeight : 40,
        fontSize: "1rem",
        fontWeight: 400,
        padding: 1,
        minWidth: 150,
        zIndex: "999 !important",
    }),

    menu: (provided, state) => ({
        ...provided,
        minWidth: 148,
        zIndex: 9999,
        borderRadius: 10,
        fontSize: "1rem",
        fontWeight: 400,
        color: state.selectProps.menuColor,
    }),
    placeholder: (provided, state) => ({
        ...provided,
        marginTop: state.selectProps.placeHolderMarginTop,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menuList: (base) => ({
        ...base,
        padding: 0,
        fontSize: "1rem",
        fontWeight: 400,
        "::-webkit-scrollbar": {
            width: "2px",
            height: "0px",
        },
        "::-webkit-scrollbar-track": {
            background: "#f1f1f1",
        },
        "::-webkit-scrollbar-thumb": {
            background: "#888",
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#555",
        },
    }),
    option: (base) => ({
        ...base,
        zIndex: "999 !important",
        borderRadius: 10,
        height: "100%",
    }),
    control: (_, { selectProps: { width } }) => ({
        width: width,
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return {
            ...provided,
            opacity,
            transition,
            marginTop: state.selectProps.marginTop ? state.selectProps.marginTop : 0,
        };
    },
};
