import './category-item.styles.scss'

export interface Props {
    category: {
        imageUrl: string;
        title: string;
        id?: number;
    }
}

const CategoryItem = ({ category }: Props) => {
    const { imageUrl, title } = category;
    return (
        <div className="category-container" >
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="category-body-container">
                <h2>{title}</h2>
            </div>
        </div>
    );
};

export default CategoryItem;
