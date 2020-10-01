import { ListSource, ListSourceInterface } from "../../DataTypes/ListSource";
import { NodeArticleInterface } from "../../DataTypes/NodeArticle";

interface ArticleListSourceInterface extends ListSourceInterface {
  items: Array<NodeArticleInterface>;
}

class ArticleListSource
  extends ListSource
  implements Iterator<NodeArticleInterface> {
  _items: Array<NodeArticleInterface>;
  [Symbol.iterator]() {
    return this;
  }
  get items(): Array<NodeArticleInterface> {
    return this._items;
  }
  set items(incoming: Array<NodeArticleInterface>) {
    this._items = incoming;
  }

  clone(): ArticleListSource {
    return new ArticleListSource(this.toObject());
  }

}
