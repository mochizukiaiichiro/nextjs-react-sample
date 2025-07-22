import { UserMainInfo } from "@/types/user";

type Props = {
    searchItems: Record<keyof UserMainInfo, string>;
    onChangeSearchItemInput: (key: keyof UserMainInfo) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickSearchButton: () => void;
    onClickResetButton: () => void;
}

export const SearchItemBox = (props: Props) => {
    const { searchItems, onChangeSearchItemInput, onClickResetButton, onClickSearchButton } = props;

    return (
        <form onSubmit={(e) => { e.preventDefault(); onClickSearchButton(); }}>
            <div>
                <label htmlFor="name">name:</label>
                <input id="name" name="name" value={searchItems.name} type="text" onChange={onChangeSearchItemInput("name")} />
                <label htmlFor="username">username:</label>
                <input id="username" name="username" value={searchItems.username} type="text" onChange={onChangeSearchItemInput("username")} />
            </div>
            <div>
                <label htmlFor="email">email:</label>
                <input id="email" name="email" value={searchItems.email} type="text" onChange={onChangeSearchItemInput("email")} />
                <label htmlFor="phone">phone:</label>
                <input id="phone" name="phone" value={searchItems.phone} type="text" onChange={onChangeSearchItemInput("phone")} />
                <label htmlFor="website">website:</label>
                <input id="website" name="website" value={searchItems.website} type="text" onChange={onChangeSearchItemInput("website")} />
            </div>
            <div>
            </div>
            <button type="submit">検索</button>
            <button type="button" onClick={onClickResetButton}>リセット</button>
        </form>
    )
}