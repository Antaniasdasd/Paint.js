import glob = require('./Global');

export class Extension {
    /** The internal name of the extension. This is not the display name!
     * Note that this value should be unique! A good example is
     * com.yourfullname.extensionname
     */
    public EXTENSION_NAME: string = "";

    paint: glob.Paint;
    private static htmlIdCount = 0;

    constructor(paint: glob.Paint) {
        this.paint = paint;
    }

    init() {
        this.paint.registerExtension(this);
    }

    /**
     * Gets called when user changes primary color.
     *
     */
    onPrimaryColorChanged() {
    }

    /**
     * Gets called when user changes secondary color.
     * 
     */
    onSecondaryColorChanged() {
    }

    /**
     * Gets called when tool size changes.
     * 
     */
    onToolSizeChanged() {
    }

    /**
     * Gets called when start resizing paper.
     * 
     */
    onResizeStart() {
    }

    /**
     * Gets called when finish resizing paper.
     * 
     */
    onResizeEnd() {
    }

    /**
     * Gets called when paper is resized.
     * 
     */
    onResize() {
    }

    /**
     * Gets called when zoom changes
     */
    onZoom() {
    }

    /**
     * Return a unique ID string to apply to dynamically generated HTML elements.
     */
    public static getUniqueHtmlId(): string {
        var count = this.htmlIdCount++;
        return 'uniq-dynamic-ext-id-' + count;
    }

    /**
     * Adds a custom indicator to the status bar.
     * \param item HTMLElement to add to the status bar
     * \param priority specifies the relative position in the statusbar. Currently not implemented. FIXME.
     * \param autoWidth specifies if the indicator space width will be auto sized to the content.
     */
    addCustomIndicatorItem(item: HTMLElement, priority: number, autoWidth: boolean): void {
        var $ = this.paint.$;

        var indicator = $('<div class="bottomIndicator" />').append($("<span />").append(item));
        if (autoWidth) {
            indicator.css("width", "auto");
        }
        $("#bottomBar").append(indicator);
    }

    /**
     * Adds a text indicator to the status bar.
     * \param icon The icon of this indicator. Currently not implemented. FIXME.
     * \param priority specifies the relative position in the statusbar. Currently not implemented. FIXME.
     * \param autoWidth specifies if the indicator space width will be auto sized to the content.
     * \returns the element that contains the text
     */
    addTextIndicatorItem(icon: string, priority: number, autoWidth: boolean): HTMLElement {
        var $ = this.paint.$;

        var div = $("<span />");
        if (icon !== null) {
            // FIXME Spostare stili nel CSS
            var img = $('<img style="vertical-align:middle; width:16px; height: 16px; margin-right: 5px;" />');
            img.attr("draggable", "false");
            img.attr("src", icon);
            div.append(img);
        }
        var textSpan = $('<span />')[0];
        div.append(textSpan);
        this.addCustomIndicatorItem(div[0], priority, autoWidth);

        return textSpan;
    }

}