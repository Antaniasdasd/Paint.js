/// <reference path="../libs/jquery/jquery.d.ts" />

module Paint {
    /**
     * This class contains a reference to most of the global
     * objects within the application.
     */
    export class Global {

        private _$: JQueryStatic;

        public document: Document;

        /** Insieme di tutte le estensioni caricate */
        private extensions: { [index: string]: any; } = {};
        /** Sottoinsieme di 'extensions' che contiene solo le estensioni di tipo Tool */
        private tools: { [index: string]: any; } = {};

        /** Current Paper object (the one at the base of the level hierarchy) */
        public currentPaper: Paint.Paper;

        /** Bar Manager */
        public barManager: Paint.BarManager;

        /** Extension Manager */
        public extensionManager: Paint.ExtensionManager;

        /** Event Manager */
        public eventEmitter = Paint.EventEmitter;

        /** Current colors */
        public _primaryColor: Paint.Color;
        public _secondaryColor: Paint.Color;
        public _toolSize: number;
        public File;
        public FileList;
        public menu = { File: null, Help: null };

        private _currentTool: any = null;

        constructor($: JQueryStatic, document: Document) {
            this._$ = $;
            this.document = document;

            this.currentPaper = new Paint.Paper(this, $('#paper')[0]);

            this.eventEmitter.paint = this;
            this.barManager = new Paint.BarManager(this);
            this.extensionManager = new Paint.ExtensionManager(this);

            this._primaryColor = Paint.Color.Black;
            this._secondaryColor = Paint.Color.White;
        }

        get $(): JQueryStatic {
            return this._$;
        }

        registerExtension(instance: any) {
            this.extensions[instance.EXTENSION_NAME] = instance;
        }

        registerTool(instance: any) {
            this.tools[instance.EXTENSION_NAME] = instance;
        }

        set primaryColor(value: Paint.Color) {
            this._primaryColor = value;
            this.eventEmitter.triggerOnPrimaryColorChanged(null);
        }

        get primaryColor() {
            return this._primaryColor;
        }

        set secondaryColor(value: Paint.Color) {
            this._secondaryColor = value;
            this.eventEmitter.triggerOnSecondaryColorChanged(null);
        }

        get secondaryColor() {
            return this._secondaryColor;
        }

        set toolSize(value: number) {
            this._toolSize = value;
            this.eventEmitter.triggerOnToolSizeChanged(null);
        }

        get toolSize() {
            return this._toolSize;
        }

        /**
         * Change active Tool
         * \param tool the new tool to be activated
         * \param idElement the element that caused tool activation
         */
        setCurrentTool(tool: any, idElement: string) {
            /* Set new tool and call Activated() and Deactivated() if tool listen these events */
            if (this._currentTool !== null && this._currentTool.deactivated) {
                this._currentTool.deactivated();
            }

            this._currentTool = tool;

            if (this._currentTool.activated) {
                this._currentTool.activated(idElement);
            }
        }

        get currentTool(): any {
            return this._currentTool;
        }

        public forEachExtension(callback: (ext: any) => void) {
            for (var ext in this.extensions) {
                if (this.extensions.hasOwnProperty(ext)) {
                    callback(this.extensions[ext]);
                }
            }
        }

        public getTool(name: string) {
            if (this.tools[name] !== undefined) {
                return this.tools[name];
            } else {
                return null;
            }
        }

        public refreshMenu(): void {
            if (process.platform === "win32") {
                var gui = global.window.nwDispatcher.requireNwGui();
                var oldmenu = gui.Window.get().menu;
                oldmenu.append(this.menu.Help);
                oldmenu.removeAt(oldmenu.items.length - 1);
                gui.Window.get().menu = oldmenu;
            }
        }
    }
}