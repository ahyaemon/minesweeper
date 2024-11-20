import githubMark from "./assets/github-mark.png"
import { BoardTable } from "./components/game/BoardTable.tsx"
import { PresetButtons } from "./components/settings/PresetButtons.tsx"
import { SettingForm } from "./components/settings/SettingForm.tsx"
import { StartButton } from "./components/settings/StartButton.tsx"

function Header() {
  return (
    <h1 className="text-xl flex flex-row items-center gap-2">
      <a
        href="https://github.com/ahyaemon/minesweeper"
        target="_blank"
        rel="noreferrer"
      >
        <img className="w-8" src={githubMark} alt="github" />
      </a>
      マインスイーパー Mine Sweeper
    </h1>
  )
}

function App() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <Header />
      <PresetButtons />
      <SettingForm />
      <StartButton />
      <BoardTable />
    </div>
  )
}

export default App
