import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { Article, CardPropsType } from 'src/types'
import { useGetHackertNewsArticles } from '../../api/getHackerNewsArticles'
import ArticleItem from './ArticleItem'

export function HackernewsCard({ meta, withAds }: CardPropsType) {
  const { data: articles = [], isLoading, error } = useGetHackertNewsArticles()

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`hn-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card card={meta} withAds={withAds}>
      <ListComponent items={articles} error={error} isLoading={isLoading} renderItem={renderItem} />
    </Card>
  )
}
