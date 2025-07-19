"use client"
import { ChangeEvent, useCallback, useState } from 'react'
import { MemoList } from './components/MemoList'
import { useMemoList } from './hooks/useMemoList'
import { button } from './style/Style'
import { appMetaList } from '@/lib/appMetaList'

export const App = ({ Id }: { Id: string }) => {
  const { memos, addTodo, deleteTodo } = useMemoList()
  const app = new Map(appMetaList.map(app => [app.id, app])).get(Id);

  // テキストボック変数数
  const [text, setText] = useState<string>('')

  // テキストボックス関数
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  // 追加ボタン関数
  const onClickAdd = () => {
    addTodo(text)
  }

  // 削除ボタン関数
  const onClickDelete = useCallback(
    (index: number) => {
      deleteTodo(index)
    },
    [deleteTodo],
  )

  return (
    <>
      <h1>{app?.title ?? "タイトル未定"}</h1>
      <p>{app?.description}</p>
      <label>
        <input type="text" value={text} onChange={onChangeText} />
      </label>
      <button style={button} onClick={onClickAdd}>
        追加
      </button>
      <MemoList memos={memos} onClickDelete={onClickDelete} />
    </>
  )
}

export default App
