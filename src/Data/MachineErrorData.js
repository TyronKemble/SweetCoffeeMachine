const MachineErrorMessages = [
    {
        id: 1,
        code: 0,
        description: "Geen storing",
        userNotification: ""
    },
    {
        id: 2,
        code: 1,
        description: "Geen water",
        userNotification: "Geen waterdruk",
        waterPressur: 0
    },
    {
        id: 3,
        code: 2,
        description: "Interne status fout",
        userNotification: "Machine is kapot"
    },
    {
        id: 4,
        code: 3,
        description: "Temperatuur te laag",
        userNotification: "Machine is kapot",
        valueTemperatuur: 0
    }
]

export default MachineErrorMessages
