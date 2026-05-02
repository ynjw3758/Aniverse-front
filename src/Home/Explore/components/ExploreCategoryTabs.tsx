import { CategoryItem, ExploreCategory } from "../exploreMockData";

type ExploreCategoryTabsProps = {
  categories: CategoryItem[];
  selectedCategory: ExploreCategory;
  onSelectCategory: (category: ExploreCategory) => void;
};

const ExploreCategoryTabs = ({ categories, selectedCategory, onSelectCategory }: ExploreCategoryTabsProps) => {
  return (
    <section id="ExploreCategoryTabs" className="ExploreCategoryTabs" aria-label="피드 카테고리">
      {categories.map((category) => (
        <button
          key={category.label}
          type="button"
          className={selectedCategory === category.label ? "isActive" : ""}
          onClick={() => onSelectCategory(category.label)}
        >
          {category.label}
        </button>
      ))}
    </section>
  );
};

export default ExploreCategoryTabs;
