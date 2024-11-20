import { BoardTable } from "./components/game/BoardTable.tsx"
import { PresetButtons } from "./components/settings/PresetButtons.tsx"
import { SettingForm } from "./components/settings/SettingForm.tsx"
import { StartButton } from "./components/settings/StartButton.tsx"

function App() {
	return (
		<div className="p-4 flex flex-col gap-6">
			<h1 className="text-xl">マインスイーパー Mine Sweeper</h1>
			<PresetButtons />
			<SettingForm />
			<StartButton />
			<BoardTable />
		</div>
	)
}

export default App
