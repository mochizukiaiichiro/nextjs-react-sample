import { FC } from "react";
import { button, container, li } from "../style/Style";

type Props = {
    memos: string[];
    onClickDelete: (index: number) => void;
}

export const MemoList: FC<Props> = (props) => {
    const { memos, onClickDelete } = props;

    return (
        <div style={container}>
            <p>メモ一覧</p>
            <ul>
                {memos.map((memo, index) => (
                    <li key={index} >
                        <div style={li}>
                            <p>{memo}</p>
                            <button style={button} onClick={() => onClickDelete(index)}>削除</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}