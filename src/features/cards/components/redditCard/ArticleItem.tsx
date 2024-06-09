import { BiCommentDetail } from 'react-icons/bi'
import { BsArrowReturnRight } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { VscTriangleUp } from 'react-icons/vsc'
import { CardItemWithActions, CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

type PostFlairPropsType = {
  text: string
  textColor?: string
  bgColor?: string
}

const PostFlair = ({ text, bgColor, textColor }: PostFlairPropsType) => {
  const color = textColor === 'light' ? '#fff' : '#000'
  const backgroundColor = bgColor ? bgColor : '#dadada'
  return (
    <div style={{ backgroundColor, color }} className="flair">
      <span>{text}</span>
    </div>
  )
}

const ArticleItem = ({ item, index, analyticsTag }: BaseItemPropsType<Article>) => {
  const { listingMode } = useUserPreferences()
  return (
    <CardItemWithActions
      source={analyticsTag}
      index={index}
      key={index}
      item={item}
      cardItem={
        <>
          <CardLink
            link={item.url}
            analyticsAttributes={{
              [Attributes.POINTS]: item.reactions,
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: analyticsTag,
            }}>
            {listingMode === 'compact' && (
              <div className="counterWrapper">
                <VscTriangleUp />
                <span className="value">{item.reactions}</span>
              </div>
            )}

            <div className="subTitle">
              {item.flair_text && (
                <PostFlair
                  text={item.flair_text}
                  bgColor={item.flair_background_color}
                  textColor={item.flair_text_color}
                />
              )}
              {item.title}
            </div>
          </CardLink>

          <div className="rowDetails">
            {listingMode === 'normal' && (
              <>
                <span className="rowItem redditRowItem">
                  <GoDotFill className="rowItemIcon" /> {item.reactions} points
                </span>
                <span className="rowItem">
                  <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
                </span>
                <span className="rowItem">
                  <BiCommentDetail className="rowItemIcon" /> {item.comments} comments
                </span>
                <span className="rowItem">
                  <BsArrowReturnRight className="rowItemIcon" /> {`r/${item.subreddit}`}
                </span>
              </>
            )}
          </div>
        </>
      }
    />
  )
}

export default ArticleItem
