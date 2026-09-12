import type { Article } from '../types'
import { formatSlashDate } from '../data/calendar'
import { AssetImage } from './AssetImage'

/** Figma: ArticleCard (290:1566) */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="article-card">
      <div className="article-card__row">
        <div className="article-card__thumb">
          <AssetImage slot={`columns/${article.image}`} alt="" />
        </div>
        <div className="article-card__body">
          <p className="article-card__title">{article.title}</p>
          <p className="article-card__meta">
            <span className="article-card__tag">{article.tag}</span>
            <span className="article-card__date">{formatSlashDate(article.date)}</span>
          </p>
        </div>
      </div>
    </li>
  )
}
