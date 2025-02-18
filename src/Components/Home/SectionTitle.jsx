

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="w-full mx-auto text-center ">
            <h3 className="text-3xl uppercase border-y-4 dark:border-white/60 py-4 my-10  dark:bg-gray-900 dark:text-white/60 bg-orange-50 md:w-4/12 mx-auto font-bold">{heading}</h3>
            {subHeading && <p className="dark:bg-gray-900 dark:text-white/60 mb-8 md:w-10/12 mx-auto text-xl">{subHeading}</p>}
        </div>
    );
};

export default SectionTitle;