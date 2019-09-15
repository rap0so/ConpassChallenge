import localManager from './index'


describe('LocalStorage fn', () => {
    let save, saved, hotspots
    const localStorageMock = (function () {
        var store = {};
        return {
            getItem: function (key) {
                return store[key];
            },
            setItem: function (key, value) {
                store[key] = value.toString();
            },
            clear: function () {
                store = {};
            },
            removeItem: function (key) {
                delete store[key];
            }
        };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    beforeEach(() => {
        saved = localManager.getAllHotspots
        save = localManager.saveHotspot
        hotspots = [
            {
                id: 1,
                target: {
                    x: 1,
                    y: 1
                }
            },
            {
                id: 2,
                target: {
                    x: 2,
                    y: 2
                }
            },
            {
                id: 3,
                target: {
                    x: 3,
                    y: 3
                }
            },
        ]
    })
    afterEach(() => {
        window.localStorage.clear()
    })
    it('save hotspots', () => {
        save(hotspots)
        expect(window.localStorage.getItem('hotspots')).toEqual(JSON.stringify(hotspots))
    });
    it('update hotspots to a new array', () => {
        let newHotspots = []
        save(hotspots)
        newHotspots = [...hotspots, {
            id: 4,
            target: {
                x: 4,
                y: 4
            },
            description: 'Fourth hotspot description',
            title: 'Fourth hotspot title'
        }]
        expect(window.localStorage.getItem('hotspots')).toEqual(JSON.stringify(hotspots))
        save(newHotspots)
        expect(window.localStorage.getItem('hotspots')).toEqual(JSON.stringify(newHotspots))
        expect(window.localStorage.getItem('hotspots')).not.toEqual(JSON.stringify(hotspots))
    });
    it('returns empty array when saving empty data', () => {
        save()
        const savedHotspots = saved()
        expect(savedHotspots).toEqual([])
    })
    it('returns all saved hotspots', () => {
        save(hotspots)
        const savedHotspots = saved()
        expect(hotspots).toStrictEqual(savedHotspots)
    })
    it('returns empty array when hotspots arent defined', () => {
        save('')
        const savedHotspots = saved()
        expect(savedHotspots).toEqual([])
    })
    it('returns console error when parsing something wrong', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {})
        const savedHotspots = saved()
        expect(savedHotspots).toEqual([])
        expect(console.error).toHaveBeenCalledTimes(1)
        console.error.mockRestore()
    })
})