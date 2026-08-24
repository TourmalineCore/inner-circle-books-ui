import './BookLayout.scss'

import NoImage from "../../../../assets/img/no-image.png"
import FlagIcon from '../../../../assets/icons/Flag.svg?react'

import clsx from 'clsx'
import { ReactNode } from 'react'
import { useImageValid } from '../../../../common/useImageValid'
import { BookReaders } from './components/book-readers/BookReaders'
import { BookInfo } from './components/book-info/BookInfo'
import { FeedbackCard } from './components/feedback-card/FeedbackCard'
import { LINK_TO_BOOKS_SERVICE } from '../../../../common/constant'

type BookLayoutProps = {
  bookId: string,
  coverUrl: string,
  title: string,
  employeesWhoReadNow: EmployeeWhoReadNowType[],
  authors: AuthorType[],
  language: string,
  knowledgeAreas: KnowledgeArea[],
  count: number,
  annotation: string,
  feedback: Feedback[],
  actionSlot?: ReactNode,
  underCoverSlot?: ReactNode,
}

export const BookLayout = ({
  bookId,
  coverUrl,
  title,
  employeesWhoReadNow,
  authors,
  language,
  knowledgeAreas,
  count,
  annotation,
  feedback,
  actionSlot,
  underCoverSlot,
}: BookLayoutProps) => {
  const isValidUrl = useImageValid(coverUrl)

  return (
    <div
      className="book-layout"
    >
      <div>
        <img
          src={isValidUrl ? coverUrl : NoImage}
          alt="Preview"
          className={clsx(`book-layout__cover`, {
            'book-layout__cover--no-image': !isValidUrl,
          })}
        />
        {underCoverSlot}
      </div>

      <div>
        <div className="book-layout__main-info-wrap">
          <header 
            className="book-layout__title"
            data-cy="book-title"
          >
            {title}
          </header>
          <BookReaders employeesWhoReadNow={employeesWhoReadNow} />
        </div>

        <div className="book-layout__wrapper">
          <BookInfo
            authors={authors}
            language={language}
            knowledgeAreas={knowledgeAreas}
            count={count}
          />
          <div className='book-layout__actions'>
            <button
              type='button'
              className='book-layout__leave-feedback-button'
              onClick={() => window.location.href = `${LINK_TO_BOOKS_SERVICE}/${bookId}/feedback`}
            >
              <FlagIcon/> I read this book before
            </button>
            {actionSlot}
          </div>
        </div>

        <h5 className="book-layout__section-name">Annotation</h5>
        <div 
          className="book-layout__annotation"
          data-cy="book-annotation"
        >
          {annotation}
        </div>

        <h5 className="book-layout__section-name">
          Feedback
          <span className="book-layout__count">{feedback.length}</span>
        </h5>
        {renderFeedbackList({
          feedback,
        })}
      </div>
    </div>
  )
}

function renderFeedbackList({
  feedback,
}: {
  feedback: Feedback[],
}) {
  if (feedback.length === 0) {
    return (
      <div
        className="book-layout__feedback-text"
        data-cy="book-feedback-text"
      >
        Let your colleagues know your opinion about this book after reading
      </div>
    )
  }

  return (
    <div
      className="book-layout__feedback-list"
      data-cy="book-feedback-list"
    >
      {feedback.map((item) => (
        <FeedbackCard
          key={item.id}
          id={item.id}
          employeeFullName={item.employeeFullName}
          leftFeedbackAtUtc={item.leftFeedbackAtUtc}
          rating={item.rating}
          progressOfReading={item.progressOfReading}
          advantages={item.advantages}
          disadvantages={item.disadvantages}
        />
      ))}
    </div>
  )
}