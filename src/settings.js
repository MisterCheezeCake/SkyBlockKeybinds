//@ts-ignore
import { @Vigilant, @TextProperty, @SwitchProperty, @ButtonProperty, @CheckboxProperty } from '../../Vigilance';

@Vigilant("SkyBlockKeybinds", "Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Advanced'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {
    @SwitchProperty({
        name: "Add to chat history",
        description: "Adds commands run by keybinds to your chat history when they are pressed",
        category: "General"
    })
    chatHistory = false; 
    @ButtonProperty({
        name: "Open Custom Keybinds GUI",
        description: "Opens the GUI for custom keybinds",
        category: "General",
        placeholder: "Open GUI"
    })
    openCustomGUI = () => ChatLib.command("sbk custom", true)
    @CheckboxProperty({
        name: "Show advanced settings",
        description: "Shows advanced settings. &cWARNING: &7Changing these settings if you don't know what you are doing could break the module",
        category: "Advanced"
    })
    showAdvanced = false;
    @TextProperty({
        name: "Version URL",
        description: "The URL to check for updates",
        category: "Advanced"
    })
    versionURL = "https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/SBK/version.txt"
    @TextProperty({
        name: "Remote Data URL",
        description: "The URL to pull keybind updates from",
        category: "Advanced"
    })
    remoteDataURL = "https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/SBK/keybinds.json"
    @ButtonProperty({
        name: "Reset Advanced Settings",
        description: "Reset advanced settings to default",
        category: "Advanced",
        placeholder: "Click to Reset"
    })
    reset() {
        this.remoteDataURL = "https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/SBK/keybinds.json";
        this.versionURL = "https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/SBK/version.txt";
        this.save()
        Java.type("gg.essential.api.EssentialAPI").getNotifications().push("&6SkyBlockKeybinds", `&cReset Advanced Settings`, 5);
        Client.currentGui.close()
        this.openGUI()
    }


    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "SkyBlockKeybinds by &6MisterCheezeCake")
        this.setCategoryDescription("Advanced", "SkyBlockKeybinds by &6MisterCheezeCake")
        this.addDependency("Version URL", "Show advanced settings")
        this.addDependency("Remote Data URL", "Show advanced settings")
        this.addDependency("Reset Advanced Settings", "Show advanced settings")
    }
}

export default new Settings;